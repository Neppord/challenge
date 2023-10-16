class Scene extends Phaser.Scene {
  preload() {
    this.load.image("smoke", "assets/smoke.png")
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
    let emitter = new Phaser.Geom.Line(50, 100, 50, 120)
    const smoke = this.add.particles(0, 0, "smoke", {
      frame: 0,
      scale: {start: 0.5, end: 0},
      speedX: -200,
      alpha: {start: 0.8, end: 0},
      emitZone: {
        source: emitter
      },
      tint: [0xFF00FF, 0xFFFFFF],
    })
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
        this.tweens.add({
          targets: smoke,
          props: {
            x: xp,
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