const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Read env variables manually
const envPath = path.join(__dirname, ".env.local");
let supabaseUrl = "";
let supabaseAnonKey = "";
let serviceRoleKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8").replace(/\r/g, "");
  envContent.split("\n").forEach(line => {
    // Remove inline comments
    const lineWithoutComment = line.split("#")[0].trim();
    const parts = lineWithoutComment.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/['"]/g, "");
      if (key === "NEXT_PUBLIC_SUPABASE_URL") supabaseUrl = val;
      if (key === "NEXT_PUBLIC_SUPABASE_ANON_KEY") supabaseAnonKey = val;
      if (key === "SUPABASE_SERVICE_ROLE_KEY") serviceRoleKey = val;
    }
  });
}

console.log("Supabase URL:", supabaseUrl);
console.log("Anon Key length:", supabaseAnonKey.length);
console.log("Service Role Key length:", serviceRoleKey.length);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseAnonKey);

async function checkTables() {
  try {
    console.log("\nChecking 'interviews' table...");
    const { data: interviews, error: intError } = await supabase
      .from("interviews")
      .select("*")
      .limit(1);

    if (intError) {
      console.error("❌ Error querying 'interviews' table:", intError.message, intError.code);
    } else {
      console.log("✅ 'interviews' table exists! Found rows:", interviews.length);
    }

    console.log("\nChecking 'feedback' table...");
    const { data: feedback, error: feedError } = await supabase
      .from("feedback")
      .select("*")
      .limit(1);

    if (feedError) {
      console.error("❌ Error querying 'feedback' table:", feedError.message, feedError.code);
    } else {
      console.log("✅ 'feedback' table exists! Found rows:", feedback.length);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

checkTables();
