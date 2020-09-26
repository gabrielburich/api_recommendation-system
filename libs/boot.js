module.exports = server => {
    server.listen(server.get('port'), () => {
        console.log('Restaurant recommendation system API start on port ' + server.get('port'))
    });
};
