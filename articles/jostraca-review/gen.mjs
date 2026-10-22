// Demo generator from the article. Run: npm i jostraca@0.40.0 && node gen.mjs
import { Jostraca, Project, File, Content } from 'jostraca'

const jostraca = Jostraca({
  model: { api: { name: process.env.NAME || 'figma', timeout: 5000 } },
  existing: { txt: { write: true, merge: true } },
})

await jostraca.generate({ folder: './out' }, () => {
  Project({ folder: 'sdk' }, () => {
    File({ name: 'client.js' }, () => {
      Content(
        "export const name = '$$api.name$$'\n\n" +
        "// settings\nexport const retries = 3\n\n" +
        "export const timeout = $$api.timeout$$\n")
    })
  })
})
