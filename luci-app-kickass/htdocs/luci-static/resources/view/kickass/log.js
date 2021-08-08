'use strict';
'require view';
'require fs';
'require ui';

return view.extend({
	load: function() {
		return fs.read('/var/log/kickass.log').catch(function(err) {
			return '';
		});
	},

	render: function(logdata) {
		var loglines = logdata.trim().split(/\n/).map(function(line) {
			return line.replace(/^<\d+>/, '');
		});

		return E([], [
			E('h2', {}, [ _('Culling logs') ]),
			E('div', {}, [
				E('textarea', {
					'id': 'syslog',
					'readonly': 'readonly',
					'rows': loglines.length + 1
				}, [ loglines.join('\n') ])
			])
		]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
