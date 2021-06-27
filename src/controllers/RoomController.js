const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = null
        let RoomMatch = true

        /* pegar da BD todos números de salas já cadastradas */
        const roomsExistIds = await db.all(`SELECT id FROM rooms`)

        /** gerar um número de sala diferente */
        while( RoomMatch )
        {
            for( var i  = 0; i< 6; i++){
                i == 0? roomId = Math.floor(Math.random() * 10).toString() : 
                roomId += Math.floor(Math.random() * 10).toString()
            }
            RoomMatch = roomsExistIds.some( roomExistId => roomExistId == roomId)
        }

        //INSERIR NOVA SALA NA BD
        if( !RoomMatch )
        {
            roomId = parseInt(roomId)
            await db.run(`INSERT INTO rooms(
                id,
                pass
            ) VALUES (${roomId},
                      ${pass})`)
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res)
    {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room=${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room=${roomId} and read = 1`)
        let isNoQuestions

        if( (questions.length == 0) && (questionsRead.length == 0) ){
            isNoQuestions = true
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions} )
    },

    async enter(req, res)
    {
        const db = await Database()
        const roomId = req.body.roomId

        const room = await db.get(`SELECT * FROM rooms WHERE id=${roomId}`)

        if( room == null)
        {
            res.render('roomNotFound')
        }
        else
        {
            res.redirect(`/room/${roomId}`)
        }
    }
}