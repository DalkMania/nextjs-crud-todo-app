import { prisma } from "../../../prisma/client";

export default async function handle(req, res) {
    const { id, title, detail, completed } = req.body;
    const result = await prisma.todo.update({
        where: { id: id },
        data: {
            title,
            detail,
            completed
        }
    });
    res.json(result);
}
