//Dependency Injection
/*None*/

//Exports======================================================================
exports.renderIndex = function(req, res) {
	//Test string. This should show the following string as the destination of the root
	//res.send('Howdy World');
	if (req.user) {
		res.render('pages/dashboard', {
			title: 'Dashboard'
		})
	} else {
		res.render('pages/index', {
			title: 'Take a step towards your goals',
			user: req.user ? req.user.username : ''
		});
	}
};

