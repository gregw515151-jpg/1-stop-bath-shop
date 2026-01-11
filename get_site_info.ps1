$siteId = "3395feaa-2d57-40f5-9e32-fd16d6048c8f"
$siteInfo = npx netlify api getSite --data "{`"site_id`": `"$siteId`"}"
Write-Output $siteInfo
