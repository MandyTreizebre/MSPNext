export async function GET(req) {
    console.log("GET request received");
    return new Response("Test log for GET request");
  }
  