# Response Types

## [<- Back](../api.md)

## Success

Status 200 OK

```json
{
    'success': true,
    'data': {*}
}
```

## Failure

Status 401 Unauthorized

```json
{
    'success': false,
    'message': 'This is a message to display to users.'
}
```

Status 400 Bad Request

```json
{
    'success': false,
    'message': 'This is a message to display to users.'
}
```
