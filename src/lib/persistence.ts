import fs from 'fs'
import path from 'path'

const DATA_DIR = path.resolve(process.cwd(), 'data')
const SIM_FILE = path.join(DATA_DIR, 'simulations.json')

export async function ensureDataDir() {
  try {
    await fs.promises.mkdir(DATA_DIR, { recursive: true })
  } catch (e) {
    // ignore
  }
}

export async function readSimulations() {
  try {
    await ensureDataDir()
    if (!fs.existsSync(SIM_FILE)) return []
    const raw = await fs.promises.readFile(SIM_FILE, 'utf8')
    return JSON.parse(raw || '[]')
  } catch (err) {
    return []
  }
}

export async function saveSimulation(sim: any) {
  try {
    await ensureDataDir()
    const arr = await readSimulations()
    arr.push(sim)
    await fs.promises.writeFile(SIM_FILE, JSON.stringify(arr, null, 2), 'utf8')
    return true
  } catch (err) {
    return false
  }
}
