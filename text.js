class Scene extends Phaser.Scene {
  preload () {
  }
  create() {
    let xp = 17
    this.add.text(100, 100, "Click any where", {
      color: "#FFFFFF",
      fontSize: 42,
      fontFamily: "Pixelify Sans",
    })
    const text = this.add.text(100, 100, "+17xp", {
      color: "#50C878",
      fontSize: 42,
      fontFamily: "Pixelify Sans",
    })
    text.visible = false
    this.textures.addGLTexture("text", text.frame.glTexture)
    //this.textures.addCanvas("text", text.canvas)
    const effect = this.add.particles(0,0, "text", {
      speed: 200,
      gravityY: 400,
      emitting: false,
    })
    this.input.on(Phaser.Input.Events.POINTER_UP, (pointer) => {
      xp += 5
      text.text = `+${xp}px`
      effect.explode(5, pointer.x, pointer.y)
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