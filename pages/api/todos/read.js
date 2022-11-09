import { prisma } from "../../../prisma/client";

export default async function handle(req, res) {
    const { authorEmail } = req.body;
    const { Todo } = await prisma.user.findUnique({
        where: {
            email: authorEmail
        },
        include: {
            Todo: true
        }
    });
    res.json(Todo);
}
