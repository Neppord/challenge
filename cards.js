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
      let card = this.add.image(
        Phaser.Math.Between(cardWidth, worldWidth - cardWidth),
        Phaser.Math.Between(cardHeight, wordlHeight - cardHeight),
        "card",
      )
      card.setInteractive({
        draggable: true,
      })
      card.on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer, x, y) => {
        let x1 = x - card.x
        const xDiff = Math.abs(x1) / 2
        const yDiff = Math.abs(y - card.y) / 2
        this.tweens.add({
          targets: card,
          duration: 100,
          props: {
            scaleX: 1 - xDiff / 10,
            scaleY: 1 - yDiff / 10,
            angle: x1
          },
        })
        if (x1 > 0) {
          card.setTint(0xFFFFFF, 0xAAAAAA, 0xFFFFFF, 0xAAAAAA)
        } else {
          card.setTint(0xAAAAAA, 0xFFFFFF, 0xAAAAAA, 0xFFFFFF)
        }
        card.setPosition(
          x,
          y,
        )
      })
      card.on(Phaser.Input.Events.DRAG_END, () => {
        card.setTint()
        this.tweens.add({
          targets: card,
          duration: 100,
          props: {
            scaleX: 1,
            scaleY: 1,
            angle: 0, 
          },
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