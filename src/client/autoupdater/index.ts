import { currentVersion } from './currentVersion.json'

class Autoupdater {
  URL = new URL('VERSION.txt', window.location.origin)

  constructor() {
    setInterval(this.checkForUpdates, 3600)
  }

  public async checkForUpdates() {
    const latestVersion = await (
      await fetch(this.URL.href, { cache: 'no-store' })
    ).text()

    if (latestVersion != currentVersion) this.reloadPage()
  }

  public reloadPage() {
    window.location.reload()
  }
}

export default Autoupdater
