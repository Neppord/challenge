class Scene extends Phaser.Scene {
  preload() {
    this.load.spritesheet("bar", "assets/bars.png", {
      frameWidth: 20,
      frameHeight: 20,
    })
  }

  create() {
    let xp = 10
    const background = this.add.nineslice(50, 100, "bar", 0, xp, 20, 5)
    background.setAlpha(0.3)
    background.setOrigin(0)
    const bar = this.add.nineslice(50, 100, "bar", 0, xp, 20, 5)
    bar.setOrigin(0)

    this.time.addEvent({
      callback: () => {
        xp = Math.max(10, xp - 10)
        background.width = xp
        this.tweens.add({
          targets: bar,
          props: {
            width: xp,
          },
          ease: "ease.in",
        })
      },
      loop: true,
      delay: 250,
    })
    this.input.on(Phaser.Input.Events.POINTER_UP, () => {
      xp += 50
      background.width = xp
      this.tweens.add({
        targets: bar,
        props: {
          width: xp,
        },
        ease: "ease.in",
      })
    })

  }
}

const game = new Phaser.Game({
  scene: Scene,
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    expandParent: true,
    mode: Phaser.Scale.ScaleModes.RESIZE,
  },
})