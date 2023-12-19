import connectMongoDB from "@/libs/mongodb";
import ScriptModel from "@/models/script";

export async function POST(req: Request) {
  // try {
  //   const { name, pic_url } = await req.json();
  //   const script = new ScriptModel({ name, pic_url });
  //   await connectMongoDB();
  //   await script.save();
  //   return Response.json({ script }, { status: 201 });
  // } catch (error) {
  //   console.error("Error creating script:", error);
  //   return Response.json({ error: "Failed to create script" }, { status: 500 });
  // }
}

export async function GET() {
  try {
    await connectMongoDB();
    const scripts = await ScriptModel.find();
    return Response.json({ scripts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return Response.json({ error: "Failed to fetch scripts" }, { status: 500 });
  }
}
