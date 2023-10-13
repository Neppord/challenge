class Scene extends Phaser.Scene {
  preload () {
    this.load.audio("pluck", "assets/pluck.mp3")
    this.load.image("smoke", "assets/smoke.png")
    this.load.image("spark", "assets/spark.png")
  }
  create() {
    let game = this.sys.game
    let canvasWidth = game.canvas.width
    let canvasHeight = game.canvas.height
    let x = canvasWidth / 2
    let y = canvasHeight / 2
    
    const gaugeRect = this.add.rectangle(
      canvasWidth,
      canvasHeight,
      canvasWidth,
      canvasHeight,
      0x55FF55
    )
    gaugeRect.setOrigin(1, 1)
    const button = this.add.container()
    let width = 200
    let height = 100
    let blue = 0x3333FF
    const rectangle = this.add.rectangle(
      0,
      0,
      width,
      height,
      blue,
    )
    button.add(rectangle)
    button.add(this.add.text(-45, -5, "Click me!"))
    let smoke = this.add.particles(
      null,
      null,
      "smoke",
      {
        lifespan: 200,
        duration: 50,
        speed: { start: 200, end: 0, ease: "Circ.easeOut" },
        emitting: false,
        scale: { start: 0, end: 1, ease: "ease.out" },
        angle: {min: -180, max: 0},
      })
    smoke.startFollow(button)
    let sparks = this.add.particles(
      null,
      null,
      "spark",
      {
        lifespan: 200,
        duration: 50,
        speed: { start: 400, end: 0, ease: "Circ.easeOut" },
        emitting: false,
        scale: 0.2,
        angle: {min: -180, max: 0},
        quantity: 5,
      })
    sparks.startFollow(button)
    button.setPosition(x, y)
    rectangle.setInteractive()
    let points = 0
    let guage = 0
    this.time.addEvent({
      callback: () => {
        console.log("guage", guage)
        guage = Math.max(0, guage - 0.5)
        gaugeRect.setOrigin(1, 1. - 1/(1. + guage/100))
      },
      delay: 250,
      loop: true
    })
    rectangle.on(Phaser.Input.Events.POINTER_DOWN, () => {
      button.setScale(1, 0.8)
    })
    rectangle.on(Phaser.Input.Events.POINTER_UP, () => {
      button.setScale(1, 1)
      points += 1
      guage += 1
      gaugeRect.setOrigin(1, 1. - 1./(1. +  guage/100))
      this.sound.play("pluck", {
        detune: ((guage * 20 + Phaser.Math.Between(0, 600)) % 2400) - 1200
      })
      smoke.emitting = true
      smoke.duration += 50
      if (guage > 5) {
        this.tweens.add({
          targets: button,
          duration: 20,
          yoyo: true,
          repeat: 4,
          props: {x: x + 10},
        })
      }
      if (guage > 0) {
        this.tweens.add({
          targets: rectangle,
          duration: 20,
          yoyo: true,
          repeat: 4,
          props: {
            fillColor: {start:blue, end:0xfffff},
          },
        })
      }
      if (guage > 15) {
        let camera = this.cameras.main
        camera.shake()
      }
      if (guage > 20) {
        let camera = this.cameras.main
        camera.flash()
      }
      if (guage > 30) {
        sparks.emitting = true
        sparks.duration += 50
      }
    })
  }
}

const game = new Phaser.Game({
  scene: Scene,
  scale: {
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    expandParent: true,
    mode: Phaser.Scale.ScaleModes.RESIZE,
  },
})