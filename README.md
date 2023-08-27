# Project DP

## To Do list / Brainstorming

3. select a week
4. range selection mode

5. time select

## In Development

1. Layout with custom templates
2. highlight days (holidays)
3. Limited date range (min, max)

## Bugs

2. picker doesn't update when selecting a date from prev or next month (datemode.service line 27 currentMonth invalid array length)
   2-1. is random. main problem the currentMonth is being created (new Array) with negative(-) value
