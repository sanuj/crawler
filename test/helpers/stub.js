import path from 'path'
import fs from 'fs'

const config = {
  stub: path.resolve(__dirname, '../stubs'),
  current: '.',
  resolver: () => ''
}

export const use = (dir, resolver) => {
  config.current = dir

  if (resolver !== undefined) {
    config.resolver = resolver
  }
}

export const load = async (name, canResolve = true) => {
  const filename = path.resolve(config.stub, config.current, name)

  if (canResolve && (process.env.TEST_FRESH || !fs.existsSync(filename))) {
    const content = await config.resolver(name)

    fs.writeFileSync(filename, content)
  }

  return fs.readFileSync(filename).toString()
}
