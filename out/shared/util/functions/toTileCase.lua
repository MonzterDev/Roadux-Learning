-- Compiled with roblox-ts v2.1.0
local function toTitleCase(str)
	local split = string.split(str, " ")
	local _arg0 = function(word, i)
		local firstLetter = string.sub(word, 1, 1)
		local theRest = string.sub(word, 2)
		split[i + 1] = string.upper(firstLetter) .. theRest
	end
	for _k, _v in split do
		_arg0(_v, _k - 1, split)
	end
	local result = table.concat(split, " ")
	return result
end
return {
	toTitleCase = toTitleCase,
}
