# Project DP

## To Do list / Brainstorming

1. select a week
3. Layout with custom templates
4. market research for useful functionality

5. time select

## In Development

1. range selection mode

## Bugs
1. dark mode test
2. picker doesn't update when selecting a date from prev or next month (datemode.service line 27 currentMonth invalid array length)
   2-1. is random. main problem the currentMonth is being created (new Array) with negative(-) value (2010 March)
3. disabled dates have border in range mode
4. 2027.02 (the last line is not generated correctly)
