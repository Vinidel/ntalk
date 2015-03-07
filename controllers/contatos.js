module.exports = function(app){
	var ContatosController = {
		index: function(req, res){

			console.log('entrou no Controller Contatos index');
			var usuario = req.session.usuario;
			var contatos = usuario.contatos;
			var params = {usuario: usuario,
						  contatos: contatos};

			console.log("Recuperou os contatos criados e incluiu no params:");
			console.log(params);


			res.render('contatos/index', params);
		},

		create: function(req, res){
			console.log('entrou no Controller Contatos create');
			var contato = req.body.contato;

			console.log("Contato criado");
			console.log("Nome: "  + contato.nome);
			console.log("Email: "  + contato.email);

			var usuario = req.session.usuario;

			usuario.contatos.push(contato);
			console.log("Array de contatos:");
			console.log(usuario.contatos[0].nome);	

			res.redirect('/contatos');
		},

		show: function(req, res){
			
			console.log('entrou no Controller Contatos show');
			var id = req.params.id;
			var contato = req.session.usuario.contatos[id];
			var params = {contato: contato,
						  id:id};
			res.render('contatos/show', params);
		},

		edit: function(req, res){
			console.log('entrou no Controller Contatos edit');
			var id = req.params.id;
			var usuario = req.session.usuario;
			var contato = usuario.contatos[id];
			var params = {usuario: usuario,
						  contato: contato,
						  id:id};

			res.render('contatos/edit', params);
		},

		update: function(req, res){
			console.log('entrou no Controller Contatos update');
			var contato = req.body.contato;
			var usuario = req.session.usuario;
			usuario.contatos[req.params.id] = contato;
			res.redirect('/contatos');
		},

		destroy: function(req, res){
			console.log('entrou no Controller Contatos destroy');
			var id = req.params.id;	
			var usuario = req.session.usuario;

			usuario.contatos.splice(id, 1);

			res.redirect('/contatos');
		}

	};
	return ContatosController;
};