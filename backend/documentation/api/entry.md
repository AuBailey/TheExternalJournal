# Entry

## [<- Back](../api.md)

## Get Entry By Id

Only gets the Entry if belongs to logged in User

### Get `/api/entry/:entryId`

## Get Entries in a user's journal

Gets all the Entries in specified Journal belonging to logged in User

### Get `/api/entry/all/:journalId`

## Create Entry

Creates a new Journal for the logged in User

### POST `/api/entry`

### BODY

Key | Description | Required
--- | --- | ---
journalId | Id of journal to add Entry to | *
entryName | Name of Entry | *
entryContent | Entry Content | *
entryLat | Lattitde where Entry was created |
entryLong | Longitude where Entry was created |

## Update Entry

Updates a Journal Entry if it belongs to the logged in user
###Body
Key | Description | Required*
entryId | Id for the updated entry |
entryname | New name for the entry | 
entryContent | additional text for an entry | 
isShared | boolean about whether the entry is shared | 

*Request requires an entryId and atleast one other field

### PUT `/api/entry`

### BODY

Key | Description | Required
--- | --- | ---
entryId | Id of the Entry to update | *
entryName | What Entry Name should be changed to | *
entryContent | What Entry content should be changed to | *
entryLat | Lattitude where Entry was edited |
entryLong | Longitude where Entry was edited |

## Delete Entry

Deletes the Entry if it belongs to the logged in user

### Delete `/api/entry`

### BODY

Key | Description | Required
--- | --- | ---
entryId | Id of Entry to delete | *