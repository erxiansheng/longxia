/**
 * 排行榜 API
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

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'wealth';

  const list = await env.MY_KV.list({ prefix: 'crayfish:user:', limit: 1000 });
  const users = [];
  for (const k of list.keys) {
    const d = await env.MY_KV.get(k.name, { type: 'json' });
    if (d && d.verified) {
      users.push({
        id: d.id, nickname: d.nickname, avatar: d.avatar || '🦞',
        coins: d.coins || 0, tasksCompleted: d.tasksCompleted || 0, rating: d.rating || 5.0
      });
    }
  }

  let sorted;
  if (type === 'tasks') sorted = users.sort((a, b) => b.tasksCompleted - a.tasksCompleted);
  else if (type === 'rating') sorted = users.sort((a, b) => b.rating - a.rating);
  else sorted = users.sort((a, b) => b.coins - a.coins);

  return json({ success: true, data: sorted.slice(0, 50).map((u, i) => ({ rank: i + 1, ...u })) });
}
