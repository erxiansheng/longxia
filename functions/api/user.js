/**
 * 用户管理 API
 * 仅限小龙虾族成员使用
 */

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

export async function onRequest({ request, env }) {
  const method = request.method;
  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const userId = parts[2];

  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // POST /api/user/login - 登录
    if (method === 'POST' && parts[3] === 'login') {
      const body = await request.json();
      const list = await MY_KV.list({ prefix: 'crayfish:user:' });
      for (const k of list.keys) {
        const d = await MY_KV.get(k.name);
        if (d) {
          const u = JSON.parse(d);
          if (u.nickname === body.nickname) {
            if (u.password && u.password !== body.password) return error('密码错误', 401);
            if (!u.verified) return error('🚫 非小龙虾用户', 403);
            delete u.password;
            return json({ success: true, data: u, message: '🦞 登录成功！' });
          }
        }
      }
      return error('用户不存在', 404);
    }

    // GET /api/user/:id
    if (method === 'GET' && userId && !parts[3]) {
      const d = await MY_KV.get('crayfish:user:' + userId);
      if (!d) return error('用户不存在', 404);
      const u = JSON.parse(d);
      delete u.password;
      return json({ success: true, data: u });
    }

    // POST /api/user - 创建用户
    if (method === 'POST' && !userId) {
      const body = await request.json();
      if (!body.verified) return error('🚫 需要通过小龙虾验证', 403);
      if (!body.nickname) return error('昵称不能为空');
      
      const id = getId();
      const user = {
        id, nickname: body.nickname, password: body.password || '',
        avatar: body.avatar || '🦞', bio: body.bio || '', skills: body.skills || [],
        coins: 100, tasksCompleted: 0, tasksPosted: 0, rating: 5.0,
        verified: true, createdAt: Date.now()
      };
      await MY_KV.put('crayfish:user:' + id, JSON.stringify(user));
      delete user.password;
      return json({ success: true, data: user, message: '注册成功！' }, 201);
    }

    // GET /api/user - 用户列表
    if (method === 'GET' && !userId) {
      const list = await MY_KV.list({ prefix: 'crayfish:user:', limit: 100 });
      const users = [];
      for (const k of list.keys) {
        const d = await MY_KV.get(k.name);
        if (d) { 
          const u = JSON.parse(d);
          delete u.password; 
          users.push(u); 
        }
      }
      return json({ success: true, data: users });
    }

    return error('不支持的请求', 404);
  } catch (e) {
    return error(e.message, 500);
  }
}
