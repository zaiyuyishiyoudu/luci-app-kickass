'use strict';
'require fs';
'require view';
'require rpc';
'require form';
'require tools.widgets as widgets';

function getkickass() {
	return fs.exec('/usr/bin/pgrep', ['-f', '/usr/sbin/kickass']).then(function (res) {
		if (res.code === 0) {
			return res.stdout.trim();
		} else {
			return "";
		}
	});
}

function kickassServiceStatus() {
	return Promise.all([
		getkickass(),
		L.resolveDefault(fs.exec('/usr/bin/pgrep', ['-f', '/usr/sbin/kickass']), null)
	]);
}

function kickassRenderStatus(res) {
	var renderHTML = "";
	var isRunning = res[0];

	if (isRunning) {
		renderHTML += "<span style=\"color:green;font-weight:bold\">" + _("RUNNING") + ' PID:' + res[1].stdout.trim() + "</span>";
		return renderHTML;
	} else {
		renderHTML += "<span style=\"color:red;font-weight:bold\">" + _("NOT RUNNING") + "</span>";
		return renderHTML;
	}
}

return view.extend({
	callHostHints: rpc.declare({
		object: 'luci-rpc',
		method: 'getHostHints',
		expect: { '': {} }
	}),

	load: function() {
		return Promise.all([
			this.callHostHints()
		]);
	},

	render: function(data) {
		var hosts = data[0],
		    m, s, o;

		m = new form.Map('kickass', _('Wireless rejection'), 
		_('Please go to wireless setting threshold'));

		s = m.section(form.NamedSection, '');
		s.anonymous = true;

		s.render = function () {
			L.Poll.add(function () {
				return L.resolveDefault(kickassServiceStatus()).then(function (res) {
					var view = document.getElementById("service_status");
					view.innerHTML = kickassRenderStatus(res);
				});
			});

			return E('div', { class: 'cbi-section' }, [
					E('div', { id: 'service_status' },
						_('Collecting data ...'))
				])
			}

		s = m.section(form.TypedSection, 'kickass', _('Basic settings'));
		s.anonymous = true;

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.rmempty = false;
		o.editable = true;

		o = s.option(form.Value, 'time', _('刷新间隔'));
		o.rmempty = false;
		o.datatype = 'uinteger';
		o.editable = true;

		return m.render();
	}
});
