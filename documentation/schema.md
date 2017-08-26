# Schema #

## Fields ##

### System Domain ###
- event_id: a universally unique incremental identifier (UUID), a 128-bit number in base58 format (e.g. `SCBmnaF3AoW6BVjuymnXc2`).
- timestamp: event timestamp in ISO 8601 format (e.g. `20170729T083603Z`).
- type: event type name. (e.g. `invoice_created`).

### Application Domain Definitions ###
- trader_id: sha256 hash of the following public key in base58 format: `m/0'/0'/1' (hardened deviation)`.
- trader_signature: sha256 hash of the following public key in base58 format `m/200'/0'/1'`.
- invoice_id: a universally unique identifier (UUID), a 128-bit number in base58 format.
- file_id:  a universally unique identifier (UUID), a 128-bit number in base58 format.
- contract_number: a BIP32 node index (valid range: 0 - 2^31-1)
- contract_master_key: extend public key `m/200'/0'/<contract_number>`
- contract_encryption_key: TBD

## Storage Restful API ##

#### Get File ####
GET api.commerceblock.com/storage/<file_id>

Response:
302 - s3 unique link

Error Response:
400 - invalid file id
404 - file not found

#### Store File ####
PUT api.commerceblock.com/storage/<file_id>

Response:
302 - s3 unique link

Error Response:
400 - invalid file id
409 - resource already exists

## Market GraphQL API ##

### Mutation ###

POST api.commerceblock.com/graphql

#### Create Account ####
Request:
- trader_id (required) (max length 300)
- master_contract_base (required) (max length 300)

Response:

Error Response:
409 - resource already exists

#### Create Invoice ####
Request:
- trader_id - (required) (max length 300)
- contract_number - (required) (valid range: 0 - 2^31-1)
- file_ids - List of contract file ids (required)
- contract_encryption_key - contract encryption key (required) (max length 300)
- btc_amount - invoice amount in btc (required)
- title - (required) (max length 100)
- external_reference_id - external reference id (optional)

#### Redeem receipt (by invoice id and trader_id) ####
Request:
- invoice_id (required) (max length 50)
- trader_id (required) (max length 100)
- contract_file_ids - List of contract_file_ids (required)

### Query ###

#### List profile ####
Request:
- trader_id - (required) (max length 300)

Response:
- trader_id
- master_contract_base

#### List invoices (by trader id) ####
Request:
- trader_id - (required) (max length 100)

Response:

#### Get invoice (by invoice id) ####
Request:
- invoice_id - (required) (max length 50)

Response:
