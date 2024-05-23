/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

/**
 * @category Instructions
 * @category InitMerkleTreeWithRoot
 * @category generated
 */
export type InitMerkleTreeWithRootInstructionArgs = {
    rightmostIndex: number;
    rightmostLeaf: number[] /* size: 32 */;
    root: number[] /* size: 32 */;
};
/**
 * @category Instructions
 * @category InitMerkleTreeWithRoot
 * @category generated
 */
export const initMerkleTreeWithRootStruct = new beet.BeetArgsStruct<
    InitMerkleTreeWithRootInstructionArgs & {
        instructionDiscriminator: number[] /* size: 8 */;
    }
>(
    [
        ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
        ['root', beet.uniformFixedSizeArray(beet.u8, 32)],
        ['rightmostLeaf', beet.uniformFixedSizeArray(beet.u8, 32)],
        ['rightmostIndex', beet.u32],
    ],
    'InitMerkleTreeWithRootInstructionArgs',
);
/**
 * Accounts required by the _initMerkleTreeWithRoot_ instruction
 *
 * @property [_writable_] merkleTree
 * @property [**signer**] authority
 * @property [] noop
 * @category Instructions
 * @category InitMerkleTreeWithRoot
 * @category generated
 */
export type InitMerkleTreeWithRootInstructionAccounts = {
    anchorRemainingAccounts?: web3.AccountMeta[];
    authority: web3.PublicKey;
    merkleTree: web3.PublicKey;
    noop: web3.PublicKey;
};

export const initMerkleTreeWithRootInstructionDiscriminator = [67, 221, 160, 236, 108, 179, 112, 198];

/**
 * Creates a _InitMerkleTreeWithRoot_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category InitMerkleTreeWithRoot
 * @category generated
 */
export function createInitMerkleTreeWithRootInstruction(
    accounts: InitMerkleTreeWithRootInstructionAccounts,
    args: InitMerkleTreeWithRootInstructionArgs,
    programId = new web3.PublicKey('cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'),
) {
    const [data] = initMerkleTreeWithRootStruct.serialize({
        instructionDiscriminator: initMerkleTreeWithRootInstructionDiscriminator,
        ...args,
    });
    const keys: web3.AccountMeta[] = [
        {
            isSigner: false,
            isWritable: true,
            pubkey: accounts.merkleTree,
        },
        {
            isSigner: true,
            isWritable: false,
            pubkey: accounts.authority,
        },
        {
            isSigner: false,
            isWritable: false,
            pubkey: accounts.noop,
        },
    ];

    if (accounts.anchorRemainingAccounts != null) {
        for (const acc of accounts.anchorRemainingAccounts) {
            keys.push(acc);
        }
    }

    const ix = new web3.TransactionInstruction({
        data,
        keys,
        programId,
    });
    return ix;
}