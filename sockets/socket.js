const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

console.log('init server')

bands.addBand( new Band('Metallica'));
bands.addBand( new Band('Linkin Park'));
bands.addBand( new Band('Sum41'));
bands.addBand( new Band('Blink182'));




//Mensajes de Sockets
io.on('connect', client => {   
    console.log('Cliente conectado')

   client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
     });

     client.on('mensaje', (payload)=> {
        console.log('mensaje!!', payload);

        io.emit('mensaje', {admin:'Nuevo mensaje'});
     });

     client.on('vote-band', payload => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
     });

     client.on('add-band', payload => {
      const newBand = new Band(payload.name)
      bands.addBand(newBand);
      io.emit('active-bands', bands.getBands());
     });

     client.on('delete-band', payload => {
      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
     });

   //   client.on('emitir-mensaje', (payload)=> {
   //    // console.log(payload);
   //    //io.emit('nuevo-mensaje', payload); //emite a todos
   //   client.broadcast.emit('nuevo-mensaje', payload); /*emite a todos menos al que lo emite*/
   //   })


  });
