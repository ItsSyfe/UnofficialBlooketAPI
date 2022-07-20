// For full transparency, this is not a function created by me and requires you to follow the license on zastix's repository for using it in your own work.
const getBuildConfig = () =>
    new Promise((resolve, reject) => {
        try {
			// we grab the entire webpack and filter through it for grabbing the current Blooket build id and the aes key being used, these change with each build.
            const buildConfig = window.webpackJsonp
                .map(e => Object.keys(e[1])
                    .map(t => e[1][t]))
                        .reduce((e, t) => [...e, ...t], [])
                            .find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString()))
                                .toString();
            resolve({
                buildId: buildConfig.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
                aesKey: buildConfig.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
            }) 
        } catch (err) {
            console.error(err)
            reject(false)
        }
    })