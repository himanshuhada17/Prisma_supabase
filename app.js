const express = require('express');
const app = express();
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json())

app.get('/users',async (req, res)=> {
    const all_users = await prisma.users.findMany();
    res.send(all_users);
})

app.post('/users',async (req, res)=> {
    const new_user = await prisma.users.create({ data: req.body });
    res.send(new_user);
})

app.get('/address',async (req, res)=> {
    const all_address = await prisma.address.findMany();
    res.send(all_address);
})

app.post('/address',async (req, res)=> {
    const new_address = await prisma.address.create({ data: req.body });
    res.send(new_address);
})


app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: req.body
        });

        res.send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
    }
});

app.delete('/users/:id',async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await prisma.users.delete({where: { id: parseInt(id) }});
        res.send(deleted)
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
    }

})

app.put('/address/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedaddress = await prisma.address.update({
            where: { id: parseInt(id) },
            data: req.body
        });

        res.send(updatedaddress);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
    }
});

app.delete('/address/:id',async (req, res) => {
    const id = req.params.id;
    try {
        const address_deleted = await prisma.address.delete({where: { id: parseInt(id) }});
        res.send(address_deleted)
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
    }

})

app.listen(5000);