/**
 * 任务管理 API
 */

const KV_NAMESPACE = 'longxia';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

function error(msg, status = 400) {
  return json({ success: false, error: msg }, status);
}

function getId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function getKV(env) {
  return env[KV_NAMESPACE] || env.my_kv;
}

export async function onRequest({ request, params, env }) {
  const kv = getKV(env);
  const method = request.method;
  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const taskId = parts[2];

  if (method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    // GET /api/tasks - 任务列表
    if (method === 'GET' && !taskId) {
      const status = url.searchParams.get('status');
      const list = await kv.list({ prefix: 'task:', limit: 100 });
      const tasks = [];
      for (const k of list.keys) {
        const d = await kv.get(k.name, { type: 'json' });
        if (d && (!status || d.status === status)) tasks.push(d);
      }
      return json({ success: true, data: tasks });
    }

    // GET /api/task/:id
    if (method === 'GET' && taskId) {
      const d = await kv.get(`task:${taskId}`, { type: 'json' });
      if (!d) return error('任务不存在', 404);
      return json({ success: true, data: d });
    }

    // POST /api/task - 创建任务
    if (method === 'POST' && !taskId) {
      const body = await request.json();
      if (!body.title || !body.reward) return error('缺少必填字段');
      
      const posterKey = `crayfish:user:${body.posterId}`;
      const poster = await kv.get(posterKey, { type: 'json' });
      if (!poster) return error('发布者不存在');
      if (poster.coins < body.reward) return error('虾钳余额不足');

      const id = getId();
      const task = {
        id, title: body.title, description: body.description || '',
        skills: body.skills || [], reward: parseInt(body.reward),
        posterId: body.posterId, posterName: poster.nickname,
        workerId: null, status: 'open', deadline: body.deadline,
        createdAt: Date.now()
      };

      poster.coins -= body.reward;
      poster.tasksPosted = (poster.tasksPosted || 0) + 1;
      await kv.put(`task:${id}`, JSON.stringify(task));
      await kv.put(posterKey, JSON.stringify(poster));
      return json({ success: true, data: task, message: '发布成功' }, 201);
    }

    // POST /api/task/:id/accept - 接单
    if (method === 'POST' && parts[3] === 'accept') {
      const body = await request.json();
      const task = await kv.get(`task:${taskId}`, { type: 'json' });
      if (!task) return error('任务不存在', 404);
      if (task.status !== 'open') return error('任务已被接走');
      
      task.workerId = body.workerId;
      task.status = 'in_progress';
      await kv.put(`task:${taskId}`, JSON.stringify(task));
      return json({ success: true, data: task, message: '接单成功' });
    }

    // POST /api/task/:id/submit - 提交
    if (method === 'POST' && parts[3] === 'submit') {
      const body = await request.json();
      const task = await kv.get(`task:${taskId}`, { type: 'json' });
      if (!task) return error('任务不存在', 404);
      if (task.status !== 'in_progress') return error('状态错误');
      
      task.submission = body.submission || '已完成';
      task.status = 'submitted';
      await kv.put(`task:${taskId}`, JSON.stringify(task));
      return json({ success: true, message: '提交成功' });
    }

    // POST /api/task/:id/verify - 验收
    if (method === 'POST' && parts[3] === 'verify') {
      const body = await request.json();
      const task = await kv.get(`task:${taskId}`, { type: 'json' });
      if (!task) return error('任务不存在', 404);
      if (task.status !== 'submitted') return error('状态错误');

      if (body.pass && task.workerId) {
        const worker = await kv.get(`crayfish:user:${task.workerId}`, { type: 'json' });
        if (worker) {
          worker.coins = (worker.coins || 0) + task.reward;
          worker.tasksCompleted = (worker.tasksCompleted || 0) + 1;
          await kv.put(`crayfish:user:${task.workerId}`, JSON.stringify(worker));
        }
        task.status = 'completed';
      } else {
        task.status = 'rejected';
      }
      await kv.put(`task:${taskId}`, JSON.stringify(task));
      return json({ success: true, message: body.pass ? '验收通过！' : '已驳回' });
    }

    return error('不支持的请求', 404);
  } catch (e) {
    return error(e.message, 500);
  }
}
