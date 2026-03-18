/**
 * 用户列表 API
 * GET /api/users
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
  } catch (e) {
    return json({ success: false, error: e.message });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
