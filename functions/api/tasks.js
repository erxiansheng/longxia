/**
 * 任务列表 API
 * GET /api/tasks
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8'
};

function json(data) {
  return new Response(JSON.stringify(data), { headers: corsHeaders });
}

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const posterId = url.searchParams.get('posterId');
    const workerId = url.searchParams.get('workerId');

    const list = await MY_KV.list({ prefix: 'task:', limit: 100 });
    const tasks = [];
    
    for (const k of list.keys) {
      const d = await MY_KV.get(k.name);
      if (d) {
        const t = JSON.parse(d);
        // 筛选条件
        if (status && t.status !== status) continue;
        if (posterId && t.posterId !== posterId) continue;
        if (workerId && t.workerId !== workerId) continue;
        tasks.push(t);
      }
    }

    return json({ success: true, data: tasks, count: tasks.length });
  } catch (e) {
    return json({ success: false, error: e.message });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
