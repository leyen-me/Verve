import path from 'path'
import fs from 'fs'
import { docRoot } from '@element-plus/build-utils'
import type { MarkdownRenderer } from 'vitepress'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?: MarkdownRenderer['renderer']['rules']['container']
}
function createGridDemoContainer(md: MarkdownRenderer): ContainerOpts {
  return {
    validate(params) {
      return !!params.trim().match(/^grid-demo\s*(.*)$/)
    },

    render(tokens, idx) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        let componentList: {
          name: string
          source: string
          description: string
        }[] = []
        let componentItems = ''
        const sourceFileToken = tokens[idx + 2]
        sourceFileToken.children?.forEach((component) => {
          const [name, description] = component.content.split(':')
          if (!name) {
            return
          }
          let source = ''
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${name}.vue`),
            'utf-8'
          )
          if (!source) throw new Error(`Incorrect source file: ${name}`)
          componentList.push({
            name,
            source,
            description,
          })
        })
        componentList = componentList.filter((component) => component.name)
        componentItems = componentList.reduce((acc, component) => {
          return `${acc}<GridDemoItem name='${
            component.name
          }' rawSource="${encodeURIComponent(
            component.source
          )}"  description='${component.description}'>
          <template #source><ep-${component.name.replaceAll(
            '/',
            '-'
          )}/></template>
          </GridDemoItem>\n`
        }, '')

        return `<GridDemo>
        <template #items>
        ${componentItems}
        </template>
        `
      } else {
        return '</GridDemo>\n'
      }
    },
  }
}

export default createGridDemoContainer
