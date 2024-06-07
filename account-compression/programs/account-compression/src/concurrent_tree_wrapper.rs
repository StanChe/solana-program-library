//! This module provides a wrapper around the `ConcurrentMerkleTree` struct from the `spl_concurrent_merkle_tree` crate.
//! It provides a set of functions that can be called from the Anchor program to interact with the tree.
//! The functions are used to initialize the tree, set a leaf, fill empty or append a leaf, and prove a leaf.
//! As the tree is generic over the depth and buffer size, the functions are implemented using macros that
//! infer the depth and buffer size from the header information stored on-chain.
//! Usage of the macros directly is discouraged, as they have huge match statements with every case taking it's own stack frame.
//! Instead, use the exported functions from this module and Box the arguments to the functions to avoid the stack frame explosion.

pub use crate::error::AccountCompressionError;
use crate::events::ChangeLogEvent;
use crate::macros::*;
use crate::state::ConcurrentMerkleTreeHeader;
use crate::zero_copy::ZeroCopy;
use anchor_lang::prelude::*;
/// Exported for Anchor / Solita
pub use spl_concurrent_merkle_tree::{
    concurrent_merkle_tree::{
        ConcurrentMerkleTree, FillEmptyOrAppendArgs, InitializeWithRootArgs, SetLeafArgs,ProofLeafArgs,
    },
    error::ConcurrentMerkleTreeError,
    node::Node,
    node::EMPTY,
};

pub fn merkle_tree_initialize_with_root(
    header: &ConcurrentMerkleTreeHeader,
    tree_id: Pubkey,
    tree_bytes: &mut [u8],
    args: &InitializeWithRootArgs,
) -> Result<Box<ChangeLogEvent>> {
    merkle_tree_apply_fn_mut!(header, tree_id, tree_bytes, initialize_with_root, args)
}

pub fn merkle_tree_set_leaf(
    header: &ConcurrentMerkleTreeHeader,
    tree_id: Pubkey,
    tree_bytes: &mut [u8],
    args: &SetLeafArgs,
) -> Result<Box<ChangeLogEvent>> {
    merkle_tree_apply_fn_mut!(header, tree_id, tree_bytes, set_leaf, args)
}

pub fn merkle_tree_fill_empty_or_append(
    header: &ConcurrentMerkleTreeHeader,
    tree_id: Pubkey,
    tree_bytes: &mut [u8],
    args: &FillEmptyOrAppendArgs,
) -> Result<Box<ChangeLogEvent>> {
    merkle_tree_apply_fn_mut!(header, tree_id, tree_bytes, fill_empty_or_append, args)
}

pub fn merkle_tree_prove_leaf(
    header: &ConcurrentMerkleTreeHeader,
    tree_id: Pubkey,
    tree_bytes: &[u8],
    args: &ProofLeafArgs,
) -> Result<Box<ChangeLogEvent>> {
    merkle_tree_apply_fn!(header, tree_id, tree_bytes, prove_leaf, args)
}
