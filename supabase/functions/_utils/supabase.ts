import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const createOrRetrieveProfile = Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    }
  );


  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  console.log(user);
  if (!user) {
    console.log("No user found");
    throw new Error("No user found");}

  return new Response(JSON.stringify({ user }), {
    headers: { "Content-Type": "application/json" },
  });
});




// export const createOrRetrieveProfile = Deno.serve(async (req: Request) => {
//   const supabaseClient = createClient(
//     Deno.env.get("SUPABASE_URL") ?? "",
//     Deno.env.get("SUPABASE_ANON_KEY") ?? ""
//   );

//   // Get the session or user object
//   const authHeader = req.headers.get("Authorization")!;
//   const token = authHeader.replace("Bearer ", "");
//   const { data } = await supabaseClient.auth.getUser(token);
//   const user = data.user;
// console.log(user);
//   return new Response(JSON.stringify({ user }), {
//     headers: { "Content-Type": "application/json" },
//     status: 200,
//   });
// });
