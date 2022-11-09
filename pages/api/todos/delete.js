import { prisma } from "../../../prisma/client";

export default async function handle(req, res) {
    const { id, action } = req.body;
    if (action === "DELETE_ONE") {
        const result = await prisma.todo.delete({
            where: { id: id }
        });
        res.json(result);
    }

    if (action === "DELETE_COMPLETED") {
        const result = await prisma.todo.deleteMany({
            where: {
                completed: true
            }
        });
        res.json(result);
    }
}
