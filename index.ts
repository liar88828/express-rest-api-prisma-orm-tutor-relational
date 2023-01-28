import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())



//-------------------GET START--------------------------------------------
//-------------------GET USER--------------------------------------------
app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({ include: { Car: true } })
    res.json(users)
});
//-------------------GET USER BYID--------------------------------------------
app.get('/user:id', async (req: Request, res: Response) => {
    res.json(await prisma.user.findUnique({
        where: { id: Number(req.params.id) }
    }));
});
//-------------------GET CARS--------------------------------------------
app.get('/cars', async (req: Request, res: Response) => {
    const users = await prisma.car.findMany({
        include: { user: true }
    })
    res.json(users)
})
// --------------------END GET----------------------



//-------------------START POST--------------------------------------- 
// -----------------ONE---------------------------------
app.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await prisma.user.create({
        data: { username, password }
    });
    res.json(user)
})
// ------------------Many-USER--------------------------
app.post('/createManyUsers', async (req: Request, res: Response) => {
    const { userList } = req.body
    res.json(await prisma.user.createMany({ data: userList }))
})
// ------------------Many-CAR--------------------------
app.post('/createManyCars', async (req: Request, res: Response) => {
    const { carLIst } = req.body
    res.json(await prisma.car.createMany({ data: carLIst }))
})
// ------------------END POST-----------------------------------




app.put('/:id', async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: { username: username, password: password }
    })
    res.json(user)
})


app.delete('/:id', async (req: Request, res: Response) => {
    const user = await prisma.user.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(user)
})

app.listen(3001, () => {
    console.log('server run in' + 3001);
})