<!-- 
  Row: a row.
  To be used with the Col component.
  Together, they comprise the grid layout.
 -->

<style>
.row {
  display: flex;
  flex-wrap: wrap;
}
</style>

<div class="row">
  <slot />
</div>