module("luci.controller.kickass", package.seeall)
local fs = require "nixio.fs"
local sys = require "luci.sys"
local template = require "luci.template"

function index()
	entry({"admin", "status", "kickass"}, call("kickass_log"), _("kickass"), 6).leaf = true

end

function kickass_log()
    local logfile = fs.readfile("/var/log/kickass.log") or ""
    template.render("kickass/kickass", {content = logfile})
end
