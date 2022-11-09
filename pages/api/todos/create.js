import { prisma } from "../../../prisma/client";

export default async function handle(req, res) {
    const { title, detail, authorEmail } = req.body;
    const result = await prisma.todo.create({
        data: {
            title: title,
            detail: detail,
            author: { connect: { email: authorEmail } }
        }
    });
    res.json(result);
}
