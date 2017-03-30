//Dependency Injection
/*None*/

//Exports======================================================================
exports.renderIndex = function(req, res) {
	//Test string. This should show the following string as the destination of the root
	//res.send('Howdy World');
	if (req.user) {
		return res.redirect('/dashboard');
	} else {
		res.render('pages/index', {
			title: 'Take a step towards your goals',
			messages: req.flash('error') || req.flash('info')
		});
	}
};



exports.renderDashboard = function(req, res) {
	res.render('pages/dashboard', {
		title: 'Dashboard'
	});
};

