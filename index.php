<?php
	include 'pageHeader.php';
?>

<body>

<?php
	include 'pageNav.php';
?>

<div class="container">
	<div class="row directedGraphDisplay" >
		<div id="cy"></div>
	</div>
</div>

<div class="clear"></div>


<div class="container">
	<div class="row">
		<input type="button" value="Re-Draw" onclick="javascript:redraw();" />
	</div>
</div>


<script type="text/javascript" src="third_party/jquery/jquery.min.js"></script>
<script type="text/javascript" src="third_party/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<script src="third_party/cytoscape/cytoscape.min.js"></script>
<script src="js/directeGraph.js"></script>
</body>



<?php
	include 'pageFooter.php';
?>
