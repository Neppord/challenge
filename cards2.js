class Scene extends Phaser.Scene {
  preload () {
    this.load.image("card", "assets/card.png")
  }
  create() {
    const cardWidth = 64 * 2
    const cardHeight = 89 * 2
    const wordlHeight = this.scale.height
    const worldWidth = this.scale.width
    for (let i = 0; i < 5; i++) {
      let card = this.add.plane(
        Phaser.Math.Between(cardWidth, worldWidth - cardWidth),
        Phaser.Math.Between(cardHeight, wordlHeight - cardHeight),
        "card",
      )
      card.setInteractive()
      card.on(Phaser.Input.Events.POINTER_DOWN, () => {
        const callback = (pointer) => {
          let {x, y} = pointer
          let x1 = x - card.x
          let y1 = y - card.y
          this.tweens.add({
            targets: card.modelRotation,
            duration: 100,
            props: {
              x: y1 * .1,
              y: x1 * .1,
              z: x1 * -.02,
            },
          })
          card.setPosition(x, y)
        }
        this.input.on(Phaser.Input.Events.POINTER_MOVE, callback)
        this.input.once(Phaser.Input.Events.POINTER_UP, () => {
          this.input.off(Phaser.Input.Events.POINTER_MOVE, callback)
          this.tweens.add({
            targets: card.modelRotation,
            duration: 100,
            props: {
              x: 0,
              y: 0,
              z: 0,
            },
          })
        })
      })
    }
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