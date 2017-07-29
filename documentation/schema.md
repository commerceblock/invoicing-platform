# Schema #


## Fields ##

### System Domain ###
- event_id: a universally unique incremental identifier (UUID), a 128-bit number in base58 format (e.g. `SCBmnaF3AoW6BVjuymnXc2`).
- timestamp: event timestamp in ISO 8601 format (e.g. `20170729T083603Z`).
- type: event type name. (e.g. `invoice_created`).

### Trade Domain ###
- trader_id: sha256 hash of the following public key in base58 format: `m/0'/0'/1' (hardened deviation)`.
- invoice_id: a universally unique identifier (UUID), a 128-bit number in base58 format.


## Mutation ##

#### Create Invoice ####
Request:
- trader_id (required) (max length 100)
- title (required) (max length 100)
- contract id (required) (valid range: 0 - 2^31-1)
- contract url (required) (Max 5MB) (max length 300)
- contract encryption key (required) (max length 100)
- invoice amount in btc (required)
- external reference id (optional)

#### Redeem receipt (by invoice id and trader_id) ####
Request:
- invoice_id (required) (max length 50)
- trader_id (required) (max length 100)
- contract url (required) (max length 300)

#### Upload Contract File ####

## Query ##

#### List invoices (by trader id) ####
Request:
- trader_id (required) (max length 100)

#### Get invoice (by invoice id) ####
Request:
- invoice_id (required) (max length 50)
