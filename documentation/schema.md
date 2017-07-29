# Schema #


## Fields ##

### System Domain ###
- event_id: a universally unique incremental identifier (UUID), a 128-bit number in base58 format (e.g. SCBmnaF3AoW6BVjuymnXc2).
- timestamp: event timestamp in ISO 8601 format (e.g. 20170729T083603Z).
- type: event type name.

### Trade Domain ###
- trader_id: sha256 hash of the following public key, `m/0'/0'/1' (hardened deviation)`, in base58 format.
- invoice_id: a universally unique identifier (UUID), a 128-bit number in base58 format.


## Mutation ##

#### Create Invoice ####
Request:
- trader_id (required)
- title (required)
- contract url
- contract encryption key
- invoice amount in btc
- external reference id (optional)

#### Redeem receipt (by invoice id and trader_id) ####
Request:
- invoice_id (required)
- trader_id (required)
- contract url

#### Upload Contract File ####

## Query ##

#### List invoices (by trader id) ####
Request:
- trader_id (required)

#### Get invoice (by invoice id) ####
Request:
- invoice_id (required)
