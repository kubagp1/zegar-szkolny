import { currentVersion } from './currentVersion.json'

class Autoupdater {
  URL = new URL('VERSION.txt', window.location.origin)

  constructor() {
    if (this.URL.hostname != 'localhost')
      setInterval(this.checkForUpdates.bind(this), 3600 * 1000)
  }

  public checkForUpdates() {
    fetch(this.URL.href, { cache: 'no-store' })
      .then((response) => response.text())
      .then((latestVersion) => {
        if (latestVersion.trim() != currentVersion.trim()) this.reloadPage()
      })
  }

  public reloadPage() {
    window.location.reload()
  }
}

export default Autoupdater
