const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PW,
    port: process.env.DB_PORT
})

const getUsers = (_request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getHobbies = (_request, response) => {
    pool.query('SELECT * FROM hobbies ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getHobbiesById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM hobbies WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getHobbiesWithUserName = (_request, response) => {
    pool.query('SELECT hobbies.id, fk_user_id, name, sport, instrument FROM users INNER JOIN hobbies on hobbies.fk_user_id = users.id',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getHobbiesByUserId = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT hobbies.id, fk_user_id, name, sport, instrument FROM users INNER JOIN hobbies ON hobbies.fk_user_id = users.id WHERE users.id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const createUser = (request, response) => {
    const { name, email } = request.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)',
        [name, email],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.insertId}`)
        })
}

const createHobby = (request, response) => {
    const { fk_user_id, sport, instrument } = request.body
    pool.query('INSERT INTO hobbies (fk_user_id, sport, instrument) VALUES ($1, $2, $3)',
        [fk_user_id, sport, instrument],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Hobby added with ID: ${results.insertId}`)
        })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3`,
        [name, email, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with Id: ${id}`)
    })
}

const deleteHobby = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM hobbies WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Hobby deleted with Id: ${id}`)
    })
}

module.exports = {
    getUsers,
    getHobbies,
    getUserById,
    getHobbiesById,
    getHobbiesWithUserName,
    getHobbiesByUserId,
    createUser,
    createHobby,
    updateUser,
    deleteUser,
    deleteHobby
}