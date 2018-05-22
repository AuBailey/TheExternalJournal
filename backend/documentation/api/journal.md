# Journal

## [<- Back](../api.md)

## Get Journal By Id

Only gets the journal if belongs to logged in User

### Get `/api/journal/:journalId`

## Get User's Journals

Gets all the Journals belonging to logged in User

### Get `/api/journal/all`

## Create Journal

Creates a new Journal for the logged in User

### POST `/api/Journal`

### BODY

Key | Description | Required
--- | --- | ---
journalName | Name of journal to create | *

## Update Journal

Updates the name of the Journal if it belongs to the logged in user

### PUT `/api/journal`

### BODY

Key | Description | Required
--- | --- | ---
journalId | id of the Journal to update | *
journalName | name to change Journal to | *

## Delete Journal

Deletes the Journal if it belongs to the logged in user

### Delete `/api/journal`

### BODY

Key | Description | Required
--- | --- | ---
journalId | Id of journal to delete | *