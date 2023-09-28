const jwt = require('jsonwebtoken'); //REQUIRE JSON WEB TOKEN PARA CREAR TOKEN DE AUTHORIZACION

//Verificacion para las rutas normales
const verifyUserToken = (req, res, next) => {
      let token = req.headers['authorization'];
      if (token == null) return res.status(401).json({ error: 'Token not provided' });
      if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
      }
      if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                  if (error) {
                        return res.json({ message: 'The token is not valid' })
                  }
                  else {
                        if (decoded.role === 'Cliente') {
                              next();
                        } else {
                              return res.status(401).json({ error: 'You do not have these permissions ' })
                        }

                  }
            });
      }
}

//Verficacion para las rutas admin
const verifyAdminToken = (req, res, next) => {
      let token = req.headers['authorization'];
      if (token == null) return res.status(401).json({ error: 'Token not provided' });
      if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
      }
      if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                  if (error) {
                        return res.json({ message: 'The token is not valid' })
                  }
                  else {
                        if (decoded.role === 'Administrador') {
                              next();
                        } else {
                              
                              return res.status(401).json({ error: `You do not have these permissions` })
                        }

                  }
            });
      }

}

module.exports = {
      verifyUserToken,
      verifyAdminToken
};