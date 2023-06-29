#!/usr/bin/env -S node -r "ts-node/register"

const A_ASCII = 'a'.charCodeAt(0)

const generatePipeOverload = (argCount: number) => {
  const args = new Array(argCount)
    .fill(null)
    .map((_, i) => String.fromCharCode(A_ASCII + i))
  return [
    `export function pipeBoundOptic<`,
    args.map((arg) => `${arg.toUpperCase()} extends Optic<any,any>`).join(', '),
    `>(`,
    [
      'a: BoundOptic<A>',
      ...args
        .slice(1)
        .map(
          (arg, index) =>
            `${args[index]}${arg}: (${args[index]}: ${args[
              index
            ].toUpperCase()}) => ${arg.toUpperCase()}`
        ),
    ].join(', '),
    `): BoundOptic<${args[args.length - 1].toUpperCase()}>`,
  ].join('')
}

const maxArgs = Number(process.argv[2])

for (let argCount = 1; argCount <= maxArgs; argCount++) {
  console.log(generatePipeOverload(argCount))
}
