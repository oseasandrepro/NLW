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

    open(req, res){
        const roomId = req.params.room

        res.render("room", {roomId: roomId} )
    }
}